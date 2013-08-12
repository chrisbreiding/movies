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

  desc "loop through movies, save rotten tomatoes data to database"
  task :rt => :environment do
    require 'open-uri'
    require 'timeout'

    baseUrl = 'http://api.rottentomatoes.com/api/public/v1.0'
    apiKey = 'hedyxeyu7a5yggpbs7jwvsqw'
    movies = Movie.all

    movies.each do |movie|
      puts "importing #{movie.title}"

      retries = 0
      url = "#{baseUrl}/movies/#{movie.rt_id}.json?apiKey=#{apiKey}"
      file = false

      begin
        Timeout::timeout(15) do
          puts "... grabbing json - attempt ##{retries + 1}"
          file = open(url).read()
        end
      rescue Timeout::Error
        retries += 1
        if retries <= 15
          sleep 5 and retry
        else
          puts "!.. failed after 15 attempts"
          raise
        end
      end

      if file
        movie_data = JSON.parse(file)

        puts "... updating movie"
        movie.update_attributes(
          critics_score: movie_data['ratings']['critics_score'],
          audience_score: movie_data['ratings']['audience_score'],
          year: movie_data['year'],
          runtime: movie_data['runtime'],
          mpaa_rating: movie_data['mpaa_rating'],
          poster_detailed: movie_data['posters']['detailed'],
          poster_original: movie_data['posters']['original'],
          poster_profile: movie_data['posters']['profile'],
          poster_thumbnail: movie_data['posters']['thumbnail']
        )

        puts "... creating actors"
        movie_data['abridged_cast'].each do |actor|
          unless movie.actors.map(&:rt_id).include? actor['id']
            actor_model = Actor.find_by_rt_id actor['id']
            if !actor_model
              actor_model = Actor.create(
                name: actor['name'],
                rt_id: actor['id']
              )
            end
            movie.actors << actor_model
          end
        end
      end
    end
  end
end
