import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';



// class CartItems extends React.component {
//     constructor () {
//         super()
//
//         // changing quantity
//         this.handleChange = this.handleChange.bind(this)
//     }
//
//     handleChange (type) {
//
//     }
//
//
//
//     const items = this.props.items;
//
//     return (
//         <div>
//             <table className="table table-striped table-responsive">
//                 <thead>
//                     <tr>
//                         <th>item</th>
//                         <th>image</th>
//                         <th>name</th>
//                         <th>n</th>
//                         <th>cost</th>
//                     </tr>
//                 </thead>
//
//                 <tbody>
//                 {
//                     items.map((item, i) => (
//                         <tr key={item.product.id}>
//                             <th scope="row">{i}</th>
//                             <td>
//                                 <Link
//                                 to={`/product/${item.product.id}`}
//                                 key={item.product.id}
//                                 ><img src={ item.product.image } />
//                                 </Link>
//                             </td>
//                             <td>{ item.product.name }</td>
//                             <td>{
//                                 ( item.quantity < item.product.inventory )
//                                 ? item.quantity
//                                 : item.product.inventory
//                             }</td>
//                             <td>{ item.cost }</td>
//                         </tr>
//                     ))
//                 }
//                 </tbody>
//
//             </table>
//         </div>
//     );
// }
//
// const mapState = state => ({
//     items : state.cart.items
// });
// const mapDispatch = {
//
// }
// export default connect(mapState, mapDispatch)(CartItems);
//
//



const CartItems = (props) => {
    const items = props.items;

    return (
        <div>
            <table className="table table-striped table-responsive">
                <thead>
                    <tr>
                        <th>item</th>
                        <th>image</th>
                        <th>name</th>
                        <th>n</th>
                        <th>cost</th>
                    </tr>
                </thead>

                <tbody>
                {
                    items.map((item, i) => (
                        <tr key={item.product.id}>
                            <th scope="row">{i}</th>
                            <td>
                                <Link
                                to={`/product/${item.product.id}`}
                                key={item.product.id}
                                ><img src={ item.product.image } />
                                </Link>
                            </td>
                            <td>{ item.product.name }</td>
                            <td>{
                                ( item.quantity < item.product.inventory )
                                ? item.quantity
                                : item.product.inventory
                            }</td>
                            <td>{ item.cost }</td>
                        </tr>
                    ))
                }
                </tbody>

            </table>
        </div>
    );
}

export default CartItems;