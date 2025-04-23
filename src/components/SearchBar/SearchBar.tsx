import { useState } from "react";
import css from "./SearchBar.module.css";
import { CgSearch } from "react-icons/cg";
import { toast } from "react-hot-toast";
import { ChangeEvent } from 'react';

type SearchBarProps = {
    request: (query: string) => void;
};

export default function SearchBar({ request }: SearchBarProps) {
    const [stateSearchBar, setStateSearchBar] = useState({
        color: "grey",
        enableSearch: false,
        query: "",
    });

    const resetSearchBar = (): void =>
        setStateSearchBar({
            color: "grey",
            enableSearch: false,
            query: "",
        });

    const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (stateSearchBar.enableSearch) {
            const formElement = event.target as HTMLFormElement;
            if (formElement && typeof formElement.reset === 'function') {
                formElement.reset();
            }
            resetSearchBar();
            request(stateSearchBar.query);
        } else {
            toast.error("Please, enter your request!");
        }
    };

    const handlerQuery = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            resetSearchBar();
        } else {
            setStateSearchBar({
                color: "blue",
                enableSearch: true,
                query: event.target.value,
            });
        }
    };

    return (
        <header className={css.searchContainer}>
            <form className={css.searchBar} onSubmit={handlerSubmit}>
                <button className={css.button} type="submit">
                    <CgSearch style={stateSearchBar} />
                </button>
                <input
                    onChange={handlerQuery}
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
}