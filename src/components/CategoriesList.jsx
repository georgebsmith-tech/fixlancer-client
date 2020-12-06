import React, { Component } from 'react';
import { domain } from '../helperFunctions/domain'
import { Link } from 'react-router-dom'


class CategoriesList extends Component {
    state = {
        categories: [],
        isLoading: true
    }

    componentDidMount = async () => {

        const response = await fetch(`${domain}/api/categories`)
        const data = await response.json()
        console.log(data.data)
        this.setState({ categories: data.data, isLoading: false })
        console.log(this.state)


    }
    render() {
        const style = {
            padding: "5px 15px",
            border: "1px solid #ddd",
            whiteSpace: "nowrap",
            marginRight: 10,
            cursor: "pointer"

        }
        let loading = <div
            style={{ width: "100%", height: 50 }} className="bg-white font20 flex-center">
            Loading...
        </div>
        return (this.state.isLoading ? loading :
            <ul
                className="flex ">
                {this.state.categories.map(category =>
                    <li
                        className="bg-white circle font14"
                        style={style} key={category._id}>
                        <Link
                            to={`/section/${category.catSlug}`}>
                            {category.name}
                        </Link>

                    </li>)}
            </ul>

        );
    }
}

export default CategoriesList;


