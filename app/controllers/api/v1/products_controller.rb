class Api::V1::ProductsController < ApplicationController
  def index
    @products = Product.all.sort
  end

  def show
    @product = Product.find(params[:id])
    @reviews = @product.reviews.max_by(5) { |review| review.created_at }
  end
end
