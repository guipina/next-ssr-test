import {NextResponse } from 'next/server'
import parser from 'ua-parser-js'

import {GET_ARTICLES, GET_ARTICLE} from "../graphql/Queries"
import client from '../apollo-client'

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/;
// Cached Static URLs
let STATIC_URLS = [];
let hasPrefetchedUrls = false;
const chacheTimeout = 10 * 1000;

const middleware = async (req) => {
    // prefetches static url list on first request
    await prefetchStaticUrls(req);

    const url = req.nextUrl.clone();

    // Skip public files
    if (PUBLIC_FILE.test(url.pathname)) return;
    if (url.pathname.startsWith('/api')) return;

    // WEBHOOK for URL refetching
    // We could have the specific url to be added/removed to reduce drastically
    // the re-check calls to the BFF
    if(url.pathname.startsWith('/refetch-static-urls')) {
        hasPrefetchedUrls = false;
        prefetchStaticUrls(req);
        url.pathname = '/';
        return NextResponse.redirect(url);
    }

    // Check device type
    const deviceType = getDeviceType(req);

    // Homepage URL
    if(url.pathname === '/') return;


    const isStaticUrl = await checkIsStaticURL(url);
    const pageType = isStaticUrl ? '/static' : '/tag';

    // Update the expected url
    url.pathname = `_device-types/${deviceType}${pageType}${url.pathname}`
    console.log(url.pathname)
    // Return rewrited response
    return NextResponse.rewrite(url);
}

async function prefetchStaticUrls(req) {
    if(hasPrefetchedUrls) return;

    // Using Fetch + NextJs API
    /*const articles = await fetch(req.nextUrl.origin + "/api/static-url?fetchUrls=true",
        {method: "GET",
        headers: {'Content-Type': 'application/json'}
    }).then(resp => resp.json());*/

    // Using GraphQl
    const {articles} = await client.query(GET_ARTICLES).then(resp => resp.data);

    STATIC_URLS = articles.map(page => getNewStaticURLEntry(page.slug));
    hasPrefetchedUrls = true;

    console.log("Fetched url list")
}

async function checkIsStaticURL(url) {
    const slugArr = url.pathname.replace("/","").split("/");
    // Ignore multi-level urls
    // POC assumption that any multi-level URL would be tag based
    if(slugArr.length > 1) return false;

    const slug = slugArr[0];
    
    // Check if Slug is already Cached as STATIC
    // TODO -> or time added greater than 30min (10s for dev)
    const urlIndex = STATIC_URLS.findIndex(url => url.slug === slug);
    const isCachedUrl = urlIndex > -1;
    const isOutdatedUrl = isCachedUrl && (Date.now() - STATIC_URLS[urlIndex].date.getTime()) > chacheTimeout;

    // debug
    console.log(`url index: ${urlIndex}`)
    console.log(`is outdated: ${isOutdatedUrl}`)
    console.log(`is CachedUrl: ${isCachedUrl}`)

    if(!isCachedUrl || isOutdatedUrl) {
        if(isCachedUrl) {
            // remove outdated URL
            STATIC_URLS.splice(urlIndex, 1);
        }

        const isStaticUrlExists = await fetchStaticUrlExists(slug);
        console.log(`isStaticUrlExists ${isStaticUrlExists}`);
        if(!isStaticUrlExists) return false;

        STATIC_URLS.push(getNewStaticURLEntry(slug));
        return true;
    }
    return true;
}

function getNewStaticURLEntry(slug) {
    return {slug: slug, date: new Date()}
}

async function fetchStaticUrlExists(slug) {
    // Check is URL is static on external Service
    const {data} = await client.query(GET_ARTICLE(slug));
    if(!data.article) return false;
    return true;
    // Using Fetch + NextJs API
    //const resp = await fetch("http://localhost:3000/api/static-url?slug="+slug).then(resp => resp.json()).exists;
}

function getDeviceType(req) {
    // Parse user agent
    return parser(req.headers.get('user-agent')).device.type === 'mobile' ? 'mobile' : 'desktop';
}

export default middleware;