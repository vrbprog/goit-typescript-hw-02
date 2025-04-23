import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";


type Image = {
    id: string;
    urls: {
        small: string;
        regular: string;
    };
    alt_description: string;
};

type Images = {
    images: Image[];
    onOpenModal: (src: string, alt: string) => void;
};

export default function ImageGallery({ images , onOpenModal }: Images) {
    return (
        <ul className={s.imageGallery}>
            {images.map(({ alt_description, id, urls: { small, regular } }) => (
                <li key={id}>
                    <ImageCard
                        small={small}
                        alt_description={alt_description}
                        openModal={() => onOpenModal(regular, alt_description)}
                    />
                </li>
            ))}
        </ul>
    );
}