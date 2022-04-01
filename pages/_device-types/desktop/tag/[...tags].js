import TagPage from '../../../../components/pages/TagPage';

export async function getStaticPaths() {
  // fallback: "blocking" -> Forces SSR pre-rendering when a page does not exist yet
    return {
        paths: [],
        fallback: "blocking"
    };
}

export async function getStaticProps(ctx) {
  //console.log(ctx)
  // Call to BFF would go here
  console.log("DESKTOP");

  return {
    props: {
        tags: ctx.params.tags,
        device: "desktop"
    }
  };
}

export default function DynamicRoutes(props) {
  return <TagPage {...props} />
}
