import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { Circle } from 'react-spinners-css';
// import Facebook from '@bit/joshk.react-spinners-css.facebook';
// import { getRandomColor } from '@bit/joshk.jotils.get-random-color'
import './Search.css'
import searchLogo from '../../assets/loupe.svg'

function Search() {
    const [results, setResults] = useState([]);
    const [str, setStr] = useState("");
    const [field, setField] = useState("");
    const [type, setType] = useState("desc");
    const [filter, setFilter] = useState("");
    const [checkSubmit, setCheckSubmit] = useState(false);
    const [docSorts, setDocsorts] = useState([]);
    const [docSources, setDocsources] = useState([]);
    const [page, setPage] = useState(1);
    const [disabled, setDisabled] = useState(false);
    // const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getDocs = async () => {
            const res = await axios.post("http://06f0494f9632.ngrok.io/api/document/master-data/search", {})
            setDocsorts(res.data.docSorts);
            setDocsources(res.data.docSources);
        }
        getDocs();
    }, [])
    useEffect(() => {
        const getData = async () => {
            try {
                if (str.length > 0) {
                    const res = await axios.post("http://06f0494f9632.ngrok.io/api/document/search", {
                        "queryString": str,
                        "page": page,
                        "sort": {
                            "sortField": field,
                            "sortType": type
                        },
                        "filter": filter
                    })
                    console.log(res.data, "???");
                    setResults(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [field, type, checkSubmit, filter, page])
    const handleOnChange = (e) => {
        console.log(e.target.value);;
        setStr(e.target.value)
    }
    const handleClick = (e) => {
        setField(e.target.value);
    }
    const handleClick1 = (e) => {
        setFilter(e.target.value);
    }
    const handleType = (e) => {
        console.log((e.target.value).toLowerCase());
        setType((e.target.value).toLowerCase());
    }
    const searchResults = (e) => {
        e.preventDefault();
        setField("");
        setFilter("")
        setPage(1)
        setCheckSubmit(!checkSubmit);
    }
    const clickHomePage = () => {
        setPage(1);
    }
    const clickLastPage = () => {
        console.log("~~~");
    }
    const handleClickDecreate = () => {
        console.log(page);
        if (page === 1) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
            setPage(page - 1)
        }
    }
    const handleClickIncreate = () => {
        console.log(page);
        setPage(page + 1)
    }
    const handleClickPage = (e) => {
        console.log(e.target.value);
        setPage(e.target.value)
    }
    return (
        <div className="container">
            <div className="search-header">
                <form className="form-search" onSubmit={searchResults}>
                    <label htmlFor="search">Search: </label>
                    <input id="search" type="text" placeholder="search here..." onChange={handleOnChange} />
                    <button type="submit">
                        <img src={searchLogo} />
                    </button>
                </form>
                <div className="filter-sort">
                    <div className="sort">
                        <span>Sorts: </span>
                        <select value={field} onChange={handleClick}>
                            <option value="" >All Sorts</option>
                            {
                                docSorts.map((item, index) => {
                                    return (
                                        <option value={item} key={index}>{item}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="filter">
                        <span>Filters: </span>
                        <select value={filter} onChange={handleClick1}>
                            <option value="" >All Sources</option>
                            {
                                docSources.map((item, index) => {
                                    return (
                                        <option value={item} key={index}>{item}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="type">
                        <span>Type: </span>
                        <select value={type} onChange={handleType}>
                            <option value="desc">DESC</option>
                            <option value="asc">ASC</option>
                        </select>
                    </div>
                </div>
            </div>
            {
                <div className="render-data">
                    {
                        results.map((item) => {
                            return (
                                <div className="render" key={item.id}>
                                    <p className="title">{item.documentTitle}</p>
                                    <p className="des">{item.documentDes}</p>
                                    <div className="box-item">
                                        <div className="d-create">
                                            <span>Date: </span>
                                            <span className="date-create">{item.dateCreate}</span>
                                        </div>
                                        <div className="review">
                                            <span>Review: </span>
                                            <span className="rv">{item.review}</span>
                                        </div>
                                        <div className="dlw">
                                            <span>Downloaded: </span>
                                            <span className="dled">{item.downloaded}</span>
                                        </div>
                                        <div className="src">
                                            <span>Source: </span>
                                            <span className="dled">{item.documentSource}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            }
            {
                results.length > 0 && <div className="page-link">
                    <div className="home-page">
                        <button className="home-page" disabled={disabled} onClick={clickHomePage}>&lsaquo;&lsaquo;</button>
                    </div>
                    <div className="pre-page">
                        <button className="decreate" disabled={disabled} onClick={handleClickDecreate}>&lsaquo;</button>
                    </div>
                    <div className="page">
                        <button className="st-page" value={parseInt(page)} onClick={handleClickPage}>{parseInt(page)}</button>
                    </div>
                    <div className="page">
                        <button className="sc-page" value={parseInt(page) + 1} onClick={handleClickPage}>{parseInt(page) + 1}</button>
                    </div>
                    <div className="page">
                        <button className="rd-page" value={parseInt(page) + 2} onClick={handleClickPage}>{parseInt(page) + 2}</button>
                    </div>
                    <div className="page">
                        <button className="rd-page" value={parseInt(page) + 3} onClick={handleClickPage}>{parseInt(page) + 3}</button>
                    </div>
                    <div className="next-page">
                        <button className="increate" onClick={handleClickIncreate}>&rsaquo;</button>
                    </div>
                    <div className="last-page">
                        <button className="last-page" disabled={disabled} onClick={clickLastPage}>&rsaquo;&rsaquo;</button>
                    </div>
                </div>
            }
            {
                (results.length === 0 && page > 1) && <>
                    <p style={{ textAlign: "center" }}>Không tìm thấy kết quả nào</p>
                    <div className="page-link">
                        <div className="home-page">
                            <button className="home-page" disabled={disabled} onClick={clickHomePage}>&lsaquo;&lsaquo;</button>
                        </div>
                        <div className="pre-page">
                            <button className="decreate" disabled={disabled} onClick={handleClickDecreate}>&lsaquo;</button>
                        </div>
                        <div className="page">
                            <button className="st-page" value={parseInt(page)} onClick={handleClickPage}>{parseInt(page)}</button>
                        </div>
                        <div className="page">
                            <button className="sc-page" value={parseInt(page) + 1} onClick={handleClickPage}>{parseInt(page) + 1}</button>
                        </div>
                        <div className="page">
                            <button className="rd-page" value={parseInt(page) + 2} onClick={handleClickPage}>{parseInt(page) + 2}</button>
                        </div>
                        <div className="page">
                            <button className="rd-page" value={parseInt(page) + 3} onClick={handleClickPage}>{parseInt(page) + 3}</button>
                        </div>
                        <div className="next-page">
                            <button className="increate" onClick={handleClickIncreate}>&rsaquo;</button>
                        </div>
                        <div className="last-page">
                            <button className="last-page" disabled={disabled} onClick={clickLastPage}>&rsaquo;&rsaquo;</button>
                        </div>
                    </div></>
            }
        </div>
    );
}

export default Search;