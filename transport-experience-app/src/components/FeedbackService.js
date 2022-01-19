export class FeedbackService {

    getProductsSmall() {
        return fetch('/feedbacks').then(res => res.json()).then(d => d.data);
    }

    getProducts() {
        return fetch('/feedbacks').then(res => res.json()).then(d => d.data);
    }

    getProductsWithOrdersSmall() {
        return fetch('/feedbacks').then(res => res.json()).then(d => d.data);
    }
}