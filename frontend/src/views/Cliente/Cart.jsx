import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import Header from "../../components/Header";

const produtos = [
    {
        id: 1,
        titulo: "Titulo do Artigo",
        descricao: "Descricao Descricao Descricao Descricao Descricao",
        imagem: "https://placehold.co/300x200?text=Imagem+Produto",
        tags: ["Homem" , "T-shirts", "M"],
    },
];

const Cart = () => {
    return (
        <>
        <Header />
        <Container className="mt-4">
            <h3>Detalhes da compra</h3>
            <div className="info-container">
                {produtos.map((produto) => (
                    <Card style={{minWidth: "300px"}} key={produto.id}>
                        
                    </Card>
                ))}
            </div>
        </Container>
        </>
    );
};

export default Cart;