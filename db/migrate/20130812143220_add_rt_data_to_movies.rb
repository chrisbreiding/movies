class AddRtDataToMovies < ActiveRecord::Migration
  def change
    add_column :movies, :critics_score,     :integer
    add_column :movies, :audience_score,    :integer
    add_column :movies, :year,              :integer
    add_column :movies, :runtime,           :integer
    add_column :movies, :mpaa_rating,       :string
    add_column :movies, :poster_detailed,   :string
    add_column :movies, :poster_original,   :string
    add_column :movies, :poster_profile,    :string
    add_column :movies, :poster_thumbnail,  :string

    create_table :actors do |t|
      t.string :name
      t.string :rt_id
    end

    create_table :actors_movies, id: false do |t|
      t.integer :movie_id
      t.integer :actor_id
    end
  end
end
