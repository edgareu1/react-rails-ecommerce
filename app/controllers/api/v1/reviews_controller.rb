class Api::V1::ReviewsController < ApplicationController
  def create
    product = Product.find(params[:id])
    @review = product.reviews.new(review_params)
    @review.save
  end

  private

  def review_params
    params.require(:review).permit(:autor, :content, :score)
  end
end
