class Review < ApplicationRecord
  validates :author, presence: true
  validates :content, presence: true
  validates :score,
    presence: true,
    inclusion: 0..5,
    numericality: { only_integer: true }

  belongs_to :product
end
