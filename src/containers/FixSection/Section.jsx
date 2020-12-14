import React, { useState, useEffect } from 'react'
import UserHeader from '../../components/UserHeader'
import UserFooter from '../../components/UserFooter'
import axios from 'axios'
import { domain } from '../../helperFunctions/domain'
import { Loading } from '../../components/helperComponents/Loading'
import FixMax4List from '../../components/fixes/FixMax4List'

const Section = ({ match, history, location }) => {
    const [category, setCategory] = useState("")
    const [subCats, setSubCats] = useState([])
    const [isLoading, setIsloading] = useState(true)
    const loggedUser = localStorage.getItem("username")
    const [fixes, setFixes] = useState([])
    const [isLoadingSub, setIsLoadingSub] = useState(false)
    const [inSub, setInSub] = useState("")


    useEffect(() => {


        async function fetchData() {
            const url = `${domain}/api/fixes/${match.url}${location.search}`
            const response = await axios.get(url)
            const data = response.data
            console.log(data)
            setFixes(data.fixes)
            setCategory(data.category)
            setSubCats(data.subCats)
            inSub && setIsLoadingSub(false)
            setIsloading(false)

        }
        fetchData()
    }, [inSub])

    const handleSubCat = (e) => {
        const subSlug = subCats.filter(sub => sub.name === e.target.textContent)[0].slug
        // console.log(e.target)
        setInSub(e.target.textContent)
        setIsLoadingSub(true)
        history.push(`${match.url}?sub=${subSlug}`)
    }
    return (
        <>
            <UserHeader />
            {
                isLoading ? <Loading
                    height="80vh"

                /> :

                    <main
                        className="main">
                        <div
                            className="margin15-top">
                            <div
                                className="bg-white border-smooth padd10 font16">
                                Fixes in <span
                                    className="bold showing-cat">{category}</span>

                            </div>
                        </div>
                        <div
                            style={{ overflow: "auto", paddingBottom: 10 }} className="margin10-top">
                            <div
                                className="cat-scroll-container" style={{ display: "flex" }}>
                                {
                                    subCats.map(sub => <div className="font15 block circle subcatBtn"
                                        onClick={handleSubCat}
                                        data-subcatslug={sub.slug} >
                                        {sub.name}
                                    </div>)
                                }

                            </div>

                        </div>



                        {
                            isLoadingSub ?
                                <Loading
                                    message={`Loading fixes in ${inSub}`}
                                    height="70vh"

                                />
                                :


                                (fixes.length === 0 ?
                                    <div
                                        className="center-text font13 flex-center bold no-results" style={{ flexDirection: "row", marginTop: 30 }}>
                                        <div className="font18">
                                            Sorry, there's no fix on this category yet.
                        </div>

                                    </div> :
                                    <FixMax4List
                                        fixes={fixes}

                                    />)



                        }



                    </main>
            }

            <UserFooter />

        </>
    )
}

export default Section;