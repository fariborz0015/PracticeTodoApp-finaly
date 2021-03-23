
import React from 'react'

function Header() {


    return (

        <div className="header px-4 ">
            <div className=" header-header ">
                <h4 className="col-8 basfont">
                    React Todo App
          </h4>
                <button className="btn  text-center pt-3 m-0 header-down-btn">
                    <i className=" h5 fa fa-chevron-down "></i>
                </button>
            </div>
        </div>


    )
}

export default Header;