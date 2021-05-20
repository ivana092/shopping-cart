import Button from '@material-ui/core/Button';
import {useCartContext} from '../contexts/Context';
// Types
import { CartItemType } from '../App';
// Styles
import {Wrapper} from './Item.styles';

type ItemProps = {
    item : CartItemType;
}

const Item: React.FC<ItemProps> = ({item}:ItemProps) => {
    const {addToCart} = useCartContext();
    return (
        <Wrapper>
            <img src={item.image} alt={item.title} />
            <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h3>{item.price}</h3>
            </div>
            <Button onClick={() => addToCart(item)}>Add to cart</Button>
        </Wrapper>
    );
}
    

export default Item;
