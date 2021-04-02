class RenameScoreInReviews < ActiveRecord::Migration[6.1]
  def change
    rename_column :reviews, :score, :rating
  end
end
