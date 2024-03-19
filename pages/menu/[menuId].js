import { useRouter } from "next/router";
import MenuDetailsPage from "../../components/templates/MenuDetailsPage";

function MenuDetail({ data }) {
  const router = useRouter();
  if (router.isFallback) {
    return <h2>Looding Page...</h2>;
  }

  return <MenuDetailsPage data={data} />;
}

export default MenuDetail;

export async function getStaticPaths() {
  const res = await fetch(`${process.env.BASE_URL}/data`);
  const data = await res.json();
  const newData = data.slice(0, 10);

  const paths = newData.map((item) => ({
    params: { menuId: item.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  console.log(params);
  const res = await fetch(`${process.env.BASE_URL}/data/${params.menuId}`);
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
    revalidate: +process.env.REVALIDATE,
  };
}
