import React, { Component } from 'react';
import { domain } from '../helperFunctions/domain'
import { Link } from 'react-router-dom'
import { Loading } from '../components/helperComponents/Loading'


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

        return (this.state.isLoading ? <Loading message="Loading categories" height="60px" /> :
            <ul
                className="flex ">
                {this.state.categories.map(category =>
                    <li
                        className="bg-white circle font15 padd10"
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


