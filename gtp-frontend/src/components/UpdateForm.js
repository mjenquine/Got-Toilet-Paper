import React from 'react'

class UpdateForm extends React.Component {
  render () {
    return (
      <div className="modal edit">
        <form>
          <div className="row">
            <label htmlFor="name">Store</label>
            <input
              type="text"
              id="store"
            />
            <label htmlFor="celebrated">Has Toilet Paper</label>
            <input
              type="text"
              id="hasTP"
            />
            <label htmlFor="likes">Brands</label>
            <input
              type="number"
              id="brands"
            />
            <label htmlFor="description">Updated as of: </label>
            <textarea
              className="u-full-width"
              id="lastUpdated"
            >
            </textarea>
            <input type="submit" value="Update Store" className="button-primary" />
            <button className="button-red">Don't Update </button>
          </div>
        </form>
      </div>
    )
  }
}

export default UpdateForm
