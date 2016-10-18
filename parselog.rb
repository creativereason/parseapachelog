class Parselog
  require 'rubygems'
  require 'apache_log_regex'
  require 'date'
  # format = '%h %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"'
  format = '%v:%p %h %l %U %t "%r" %>s %O "%{Referer}i" "%{User-Agent}i"'
  # format = '%h %p %l %u %t \"%r\" %>s %b'
  parser = ApacheLogRegex.new(format)

  folder_path = "/Users/creativereason/sites/logparser/vhosts/other_vhosts_access.log"
  File.readlines(folder_path).collect do |line|
    puts line
    p parser.parse!(line)
    puts p
  end
end
