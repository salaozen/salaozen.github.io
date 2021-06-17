setup:
	arch -arch x86_64 bundle install

run:
	arch -arch x86_64 bundle exec jekyll serve -l

run_production:
	JEKYLL_ENV=production arch -arch x86_64 bundle exec jekyll serve

stop:
	kill $(lsof -ti:4000)

build:
	arch -arch x86_64 bundle exec jekyll build