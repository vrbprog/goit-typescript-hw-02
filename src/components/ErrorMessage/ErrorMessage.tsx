import css from './ErrorMessage.module.css';

export default function ErrorMessage() { 
    return <p className={css.message}>Oops! Something went wrong!</p>;
};