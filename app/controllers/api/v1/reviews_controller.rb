class Api::V1::ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    product = Product.find(params[:product_id])
    @review = product.reviews.new(review_params)
    was_review_created = @review.save

    render json: {
      network_error: false,
      was_created: was_review_created,
      review: @review,
      errors: @review.errors.full_messages
    }
  end

  private

  def review_params
    params.require(:review).permit(:author, :content, :rating)
  end
end
