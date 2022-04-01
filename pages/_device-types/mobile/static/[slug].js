import client from '../../../../apollo-client';
import {GET_ARTICLE} from "../../../../graphql/Queries";
import StaticPage from '../../../../components/pages/StaticPage';


export async function getStaticPaths() {
  // fallback: "blocking" -> Forces SSR pre-rendering when a page does not exist yet
    return {
        paths: [],
        fallback: "blocking"
    };
}

export async function getStaticProps(ctx) {
  console.log("MOBILE");
  const {data} = await client.query(GET_ARTICLE(ctx.params.slug));
  
  if(data.article) {
    return {
      props: {
        article: data.article,
        device: "mobile"
      }
    };
  }
  // this triggers a 404
  return {
    notFound: true
  }
}

export default function StaticPageRouteMobile(props) {
  return <StaticPage {...props} />;
}