import { useState, useEffect } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchImages from "./services/unsplash";
import { toast } from "react-hot-toast";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

// type Image = {
//     id: string;
//     urls: {
//         small: string;
//         regular: string;
//     };
//     alt_description: string;
// };

// type Images = {
//     images: Image[];
//     onOpenModal: (src: string, alt: string) => void;
// };

export default function App() {
    
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isNotLastPage, setIsNotLastPage] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');
    const [modalDescription, setModalDescription] = useState('');

    useEffect(() => {

        const getArticlesData = async () => {
        try {
            
            if (query === '') return;
            
            setIsError(false);
            setIsLoading(true);
            const { total_pages, results } = await fetchImages(query, page);
            if(page === total_pages) {
                setIsNotLastPage(false);
            }
            else {
                setIsNotLastPage(true);
            }

            if (total_pages === 0) {
                toast.error('No results were found for your query!');
                setArticles([]);
            }
            else {
                if (page === 1) {
                    setArticles(results);
                }
                else {
                    setArticles((art) => [...art, ...results]);
                }
            }
        } catch {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
        };
        
    getArticlesData();
    }, [query, page]);

    const request = (newQuery: string) => {
        if(query === newQuery) return;
        setQuery(newQuery);
        setPage(1);
    };

    const isLoadImages = () => {
        return articles.length > 0;
    }

    const handleLoadMore = () => {
        setPage((page) => page + 1);
    };

    const handleModal = (image: string, description: string) => {
        setModalImage(image);
        setModalDescription(description);
        setModalIsOpen(true);
    }

    return (
        <>
            <SearchBar request={request} />

            {isError ? <ErrorMessage /> :
                <>
                    <ImageGallery images={articles} onOpenModal={handleModal}/>
                    {isLoading ? <Loader /> :
                        isNotLastPage && isLoadImages() &&
                        <LoadMoreBtn onLoadMore={handleLoadMore} />
                    }
                </>
            }

            <ImageModal
                isOpen={modalIsOpen}
                closeModal={() => setModalIsOpen(false)}
                image={modalImage}
                description={modalDescription}
            />
        </>
    );
}
