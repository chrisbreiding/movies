require "bundler/capistrano"

$:.unshift(File.expand_path('./lib', ENV['rvm_path'])) # Add RVM's lib directory to the load path.
require "rvm/capistrano" # Load RVM's capistrano plugin.

set :application, "movies"
set :repository,  "git://github.com/chrisbreiding/movies.git"

set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

set :deploy_to, "/srv/www/movies.crbapps.com"

role :web, "chrisbreiding.com"                          # Your HTTP server, Apache/etc
role :app, "chrisbreiding.com"                          # This may be the same as your `Web` server
role :db,  "chrisbreiding.com", :primary => true        # This is where Rails migrations will run

set :user, "root"
set :scm_username, "chrisbreiding"
set :use_sudo, false

set :stages, ["production"]
set :default_stage, "production"

# set :rvm_ruby_string, "ruby-1.9.3-p125@movies"
# set :rvm_type, :user
# set :rvm_type, :system

after 'deploy:symlink', 'deploy:cleanup' # makes sure there's only 3 deployments, deletes the extras

# If you are using Passenger mod_rails uncomment this:
namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

# fixes asset pipeline issue
set :normalize_asset_timestamps, false

after 'deploy:update_code' do
  run "cd #{release_path}; RAILS_ENV=production rake assets:precompile"
end