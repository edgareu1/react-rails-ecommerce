class Api::V1::ReviewsController < ApplicationController
  include ReviewsHelper

  skip_before_action :verify_authenticity_token

  def create
    product = Product.find(params[:product_id])
    review = product.reviews.new(review_params)
    was_review_created = review.save

    if was_review_created
      hash_review = format_review(review)
    end

    render json: {
      was_created: was_review_created,
      review: hash_review,
      errors: review.errors.full_messages
    }
  end

  def destroy
    review = Review.find(params[:id])
    review.destroy
  end

  private

  def review_params
    params.require(:review).permit(:author, :content, :rating)
  end
end
