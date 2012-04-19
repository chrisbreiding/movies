class CreateMoviesGenres < ActiveRecord::Migration
  def change
    create_table :genres do |t|
      t.string :name
      t.string :slug
    end

    create_table :movies do |t|
      t.string :title
      t.string :rt_title
      t.boolean :chris
      t.boolean :sarah
      t.boolean :shortlist

      t.timestamps
    end

    create_table :movies_genres, id: false do |t|
        t.integer :movie_id
        t.integer :genre_id
    end
  end
end
