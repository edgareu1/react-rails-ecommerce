class Api::V1::ReviewsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    product = Product.find(params[:product_id])
    @review = product.reviews.new(review_params)
    @review.save
  end

  private

  def review_params
    params.require(:review).permit(:author, :content, :score)
  end
end
