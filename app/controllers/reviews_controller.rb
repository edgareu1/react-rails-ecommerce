class ReviewsController < ApplicationController
  def create
    product = Product.find(params[:id])
    @review = Review.new(review_params)
    @review.product = product
    @review.save
  end

  private

  def review_params
    params.require(:review).permit(:autor, :content, :score)
  end
end
