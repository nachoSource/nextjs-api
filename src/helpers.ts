const checkForNullishValues = (data) => {
    let anyNullishValue = false;
    Object.values(data).forEach((v) => {
        if (!v) anyNullishValue = true;
    });
    return anyNullishValue;
};

export { checkForNullishValues };
