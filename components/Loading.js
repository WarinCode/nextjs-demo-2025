import { Spinner } from "reactstrap";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mt-40">
      <Spinner
        color="dark"
        type="grow "
        size="lg"
      >
        Loading...
      </Spinner>
    </div>
  );
};

export default Loading;
