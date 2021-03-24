class Api::V1::ProductsController < ApplicationController
  def index
    @products = Product.all.sort
  end

  def show
    @product = Product.find(params[:id])
    @reviews = @product.reviews.sort
  end
end
