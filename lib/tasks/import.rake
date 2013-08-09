namespace :import do
  require 'json'

  desc "import movies with json"
  task :movies, [:json] => :environment do |t, args|
    file_name = "#{Rails.root}/imports/#{args[:json]}"
    puts "import movies from #{file_name}"
    file_contents = File.read(file_name)
    movies = JSON.parse(file_contents)
    movies.each do |movie|
      created_movie = Movie.create(
        chris: movie["chris"],
        rt_id: movie["rt_id"],
        sarah: movie["sarah"],
        shortlist: movie["shortlist"],
        title: movie["title"]
      )
      movie["genres"].each do |genre|
        created_movie.genres << Genre.find(genre["id"])
      end
    end
  end

  desc "import genres with json"
  task :genres, [:json] => :environment do |t, args|
    file_name = "#{Rails.root}/imports/#{args[:json]}"
    puts "import genres from #{file_name}"
    file_contents = File.read(file_name)
    genres = JSON.parse(file_contents)
    genres.each do |genre|
      Genre.create(
        name: genre["name"],
        slug: genre["slug"]
      )
    end
  end

end
