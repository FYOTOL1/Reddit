import SectionOne from "@/components/headerApp/SectionOne";
import FirstSection from "@/components/homeSection/FirstSection";
import { closeList } from "@/redux/reducer/profileSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function Home({ data, error }) {
  const Store = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const closeWindow = () => {
    dispatch(closeList());
  };
  console.log(Store);
  return (
    <>
      {data ? (
        <div className="conter">
          <SectionOne />
          <div onClick={closeWindow} className="containerApp">
            <FirstSection />
          </div>
        </div>
      ) : (
        "Error"
      )}
    </>
  );
}

export async function getServerSideProps(params) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/${params.query.id}`
    );
    const data = response.data;

    if (data) {
      return {
        props: {
          data,
        },
      };
    } else {
      return {
        props: {
          error: "NO data",
        },
      };
    }
  } catch (error) {
    return {
      props: {
        error: JSON.stringify(error),
      },
    };
  }
}
