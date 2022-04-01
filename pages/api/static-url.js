import {GET_ARTICLES, GET_ARTICLE} from "../../graphql/Queries";
import client from '../../apollo-client';

export default async function handler(req, res) {
    let obj;
    if(req.query.slug) {
        const {data} = await client.query(GET_ARTICLE(req.query.slug));
        if(!data.article) { 
            obj = { exists: false }
        } else {
            obj = { exists: true }
        }
    }
    if(req.query.fetchUrls) {
        const {data} = await client.query(GET_ARTICLES);
        obj = data.articles;
    }
    res.status(200).json(obj)
  }