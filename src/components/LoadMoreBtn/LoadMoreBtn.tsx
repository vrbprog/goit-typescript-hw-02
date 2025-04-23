import css from './LoadMoreBtn.module.css';

type LoadMoreBtnProps = {
    onLoadMore: () => void;
};

export default function LoadMoreBtn({ onLoadMore }: LoadMoreBtnProps) {
    return (
        <div className={css.buttonWrapper}>
            <button className={css.moreButton} type="button" onClick={onLoadMore}>
                Load more
            </button>
        </div>
    );
    
};