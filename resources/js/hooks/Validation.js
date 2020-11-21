export default function validateLogin(values) {
    let errors = {};

    if (!values.title) {
        errors.title = "Title is required";
    } else if (values.title.length < 5) {
        errors.title = "Needs to be more than 5 characters";
    } else {
        errors.title = "";
    }

    if (!values.publisher) {
        errors.publisher = "Publisher is required";
    } else if (values.publisher.length < 5) {
        errors.publisher = "Needs to be more than 5 characters";
    } else {
        errors.publisher = "";
    }

    if (!values.rentDate) {
        errors.rentDate = "Date is required";
    } else {
        errors.rentDate = "";
    }

    if (values.returnDate) {
        let rentDate = new Date(values.rentDate);
        let returnDate = new Date(values.returnDate);
        let differenceInTime = returnDate.getTime() - rentDate.getTime();
        let totalDays = differenceInTime / (1000 * 3600 * 24);

        if (totalDays < 0) {
            errors.returnDate = "Date shouldn't be lower than rent date";
        } else {
            errors.returnDate = "";
        }
    } else {
        errors.returnDate = "";
    }

    return errors;
}
