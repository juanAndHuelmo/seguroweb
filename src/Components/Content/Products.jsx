import React, { useState } from 'react';

const products = [
    { id: 1, name: 'Producto 1', description: 'Descripción breve 1' },
    { id: 2, name: 'Producto 2', description: 'Descripción breve 2' },
    { id: 3, name: 'Producto 3', description: 'Descripción breve 3' },
    { id: 4, name: 'Producto 4', description: 'Descripción breve 4' },
    { id: 5, name: 'Producto 5', description: 'Descripción breve 5' },
];

const slideStyles = {
    container: {
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1rem',
        boxSizing: 'border-box',
    },
    slider: {
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '12px',
        border: '1px solid #ddd',
    },
    track: {
        display: 'flex',
        transition: 'transform 0.35s ease',
    },
    card: {
        minWidth: '100%',
        padding: '2rem',
        boxSizing: 'border-box',
        textAlign: 'center',
        backgroundColor: '#fafafa',
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '1rem',
    },
    button: {
        padding: '0.75rem 1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        cursor: 'pointer',
    },
    buttonDisabled: {
        opacity: 0.5,
        cursor: 'not-allowed',
    },
};

function Products() {
    const [activeIndex, setActiveIndex] = useState(0);

    const prevSlide = () => {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
    };

    const nextSlide = () => {
        setActiveIndex((prev) => Math.min(prev + 1, products.length - 1));
    };

    return (
        <div style={slideStyles.container}>
            <h2>Slide Bar de Productos</h2>
            <div style={slideStyles.slider}>
                <div
                    style={{
                        ...slideStyles.track,
                        transform: `translateX(-${activeIndex * 100}%)`,
                    }}
                >
                    {products.map((product) => (
                        <div key={product.id} style={slideStyles.card}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div style={slideStyles.controls}>
                <button
                    style={{
                        ...slideStyles.button,
                        ...(activeIndex === 0 ? slideStyles.buttonDisabled : {}),
                    }}
                    onClick={prevSlide}
                    disabled={activeIndex === 0}
                >
                    Anterior
                </button>
                <button
                    style={{
                        ...slideStyles.button,
                        ...(activeIndex === products.length - 1
                            ? slideStyles.buttonDisabled
                            : {}),
                    }}
                    onClick={nextSlide}
                    disabled={activeIndex === products.length - 1}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default Products;