import css from './ImageCard.module.css';

type Props = {
    small: string;
    alt_description: string;
    openModal: () => void;
};

export default function ImageCard({ small, alt_description, openModal }: Props) {

    return (
        <div>
          <img className={css.card}
            src={small}
            alt={alt_description}
            onClick={openModal}
           />
        </div>
      );
    }