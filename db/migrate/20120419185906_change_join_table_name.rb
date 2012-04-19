class ChangeJoinTableName < ActiveRecord::Migration
  def up
  	rename_table :movies_genres, :genres_movies
  end

  def down
  	rename_table :genres_movies, :movies_genres
  end
end
