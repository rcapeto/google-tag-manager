const errorsMessage = { 
    orderId: (orderId: string) => `Don't find order with id = ${orderId}`,
    create: (orderId: string) => `Order with ${orderId} created with success`,
    error: 'Something went wrong',
    urlWithOutId: "Don't find orderId"
};

const status = { 
    success: 200,
    created: 202,
    error: 400,
    notFound: 404,
}

export { 
    errorsMessage,
    status,
}