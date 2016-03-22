/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */
// Adds the systems that shape your system
systems({
  'azkdemo-slim-php': {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/php:5.6"},
    // Steps to execute before running instances
    provision: [
      "composer install",
    ],
    command: "php -S 0.0.0.0:80 -t /azk/#{manifest.dir}/public",
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    wait: {"retry": 20, "timeout": 1000},
    mounts: {
      '/azk/#{manifest.dir}': sync("."),
      '/azk/#{manifest.dir}/vendor': persistent("./vendor"),
      '/azk/#{manifest.dir}/composer.phar': persistent("./composer.phar"),
      '/azk/#{manifest.dir}/composer.lock': path("./composer.lock")
    },
    scalable: {"default": 1},
    http: {
      domains: [ "#{system.name}.#{azk.default_domain}" ]
    },
    ports: {
      // exports global variables
      http: "80/tcp",
    },
    envs: {
      APP_DIR: "/azk/#{manifest.dir}",
    },
  },
});
