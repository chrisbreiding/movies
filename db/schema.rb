# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130812143220) do

  create_table "actors", :force => true do |t|
    t.string "name"
    t.string "rt_id"
  end

  create_table "actors_movies", :id => false, :force => true do |t|
    t.integer "movie_id"
    t.integer "actor_id"
  end

  create_table "genres", :force => true do |t|
    t.string "name"
    t.string "slug"
  end

  create_table "genres_movies", :id => false, :force => true do |t|
    t.integer "movie_id"
    t.integer "genre_id"
  end

  create_table "movies", :force => true do |t|
    t.string   "title"
    t.string   "rt_id"
    t.boolean  "chris",            :default => false
    t.boolean  "sarah",            :default => false
    t.boolean  "shortlist",        :default => false
    t.datetime "created_at",                          :null => false
    t.datetime "updated_at",                          :null => false
    t.integer  "critics_score"
    t.integer  "audience_score"
    t.integer  "year"
    t.integer  "runtime"
    t.string   "mpaa_rating"
    t.string   "poster_detailed"
    t.string   "poster_original"
    t.string   "poster_profile"
    t.string   "poster_thumbnail"
  end

end
