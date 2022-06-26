import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addToCard, allCard, clearCard} from "./productsListSlice";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";
import "./cardSummary.css"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {clearOneCard, decreaseQuantity} from "./productsListSlice";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {CardMedia, IconButton} from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import Swal from "sweetalert2";
import {loginUser} from "../../login/loginSlice";


const CardSummary = () => {
    const card = useSelector(allCard);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(loginUser)

    const clearOneCardHandler = (paramsProduct) => {
        dispatch(clearOneCard(paramsProduct))
    }

    const decreaseHandler = (paramsProduct) => {
        dispatch(decreaseQuantity(paramsProduct))
    }
    const addProductToCard = (paramsProduct) => {
        if (Object.keys(user).length === 0) {
            Swal.fire({
                icon: 'info', title: "Login to buy anything", showConfirmButton: false, timer: 1500
            }).then(r => console.log(r))
        } else {
            dispatch(addToCard(paramsProduct))

        }
    }

    const calPrice = () => {
        let price = 0;
        card.map(product => {
            price += product.product.price * product.quantity
        })
        return price
    }
    
    const buyHandler = () => {
        Swal.fire({
            icon: 'success', title: "Bought Successfully", showConfirmButton: false, timer: 1500
        }).then(r => console.log(r))
        navigate("/")
        dispatch(clearCard())
    }
    
    
    

    const renderFullCard = () => {
        return (
            <div>
                <div className={"price-buy"}>
                    <span>
                        Total Price:  <span className={"total-price"}>${calPrice()}</span>
                    </span>
                    <Button variant="contained" color={"success"} onClick={buyHandler}>Buy</Button>

                </div>
                <div className={"container"}>

                    {
                        card.map(product => {
                            return (
                                <span className={"card-summary-container"} key={product.product.id}>
                        <Card sx={{maxWidth: 345}} className={"card"}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image={product.product.url}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" color={"primary"}>
                                    {product.product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <div className={"card-price"}>
                                        Price: ${product.product.price}
                                    </div>
                                    <div className={'card-quantity'}>
                                        Quantity: {product.quantity}
                                    </div>

                                </Typography>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Learn More</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {product.product.about}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </CardContent>
                            <CardActions>
                                <IconButton color={"error"} onClick={() => {
                                    clearOneCardHandler(product)
                                }}>
                                    <RemoveShoppingCartIcon/>
                                </IconButton>
                                <IconButton color={"warning"} disabled={product.quantity <= 1} onClick={() => {
                                    decreaseHandler(product)
                                }}>
                                    <RemoveCircleOutlineIcon/>
                                </IconButton>
                                 <IconButton color="success" size="small"
                                             onClick={() => {
                                                 addProductToCard(product.product)
                                             }}>
                                         <AddCircleRoundedIcon color="success" className={"add-btn"}/>
                                 </IconButton>
                            </CardActions>
                        </Card>
                    </span>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    const renderEmptyCard = () => {
        return (
            <div className={"d-flex justify-content-center"}>
                <Card className={"empty-card"}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" color={"error"}>
                            Card is Emtpy <SentimentVeryDissatisfiedIcon/>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Add something
                        </Typography>
                    </CardContent>
                    <CardActions className={"w-100 d-flex justify-content-center"}>
                        <Button size="small" variant="contained" color={"success"} onClick={() => {
                            navigate("/")
                        }}>Add</Button>

                    </CardActions>
                </Card>
            </div>
        )
    }


    if (Object.keys(card).length === 0) {

        return renderEmptyCard()
    } else {
        console.log(card)
        return renderFullCard()
    }


};

export default CardSummary;