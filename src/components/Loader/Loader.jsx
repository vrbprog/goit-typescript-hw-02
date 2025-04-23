import { RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";

export default function Loader() {
    return (
      <div className={css.container}>
        <RotatingLines
            strokeColor="blue"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
        />
    </div>
  )
}