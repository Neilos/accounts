class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def index

  end

  def sankey
    data = {
      "nodes" => [
        {"node" => 0,"name" => "node0", "id"=>1},
        {"node" => 1,"name" => "node1", "id"=>2},
        {"node" => 2,"name" => "node2", "id"=>3},
        {"node" => 3,"name" => "node3", "id"=>4},
        {"node" => 4,"name" => "node4", "id"=>5},
      ],
      "links" => [
        {"source"=>3, "target"=>2, "value"=>17, "id"=>1},
        {"source"=>0, "target"=>4, "value"=>77, "id"=>2},
        {"source"=>2, "target"=>1, "value"=>94, "id"=>3},
        {"source"=>0, "target"=>1, "value"=>46, "id"=>4},
        {"source"=>0, "target"=>4, "value"=>10, "id"=>5},
        {"source"=>2, "target"=>0, "value"=>29, "id"=>6},
        {"source"=>4, "target"=>2, "value"=>18, "id"=>7},
        {"source"=>1, "target"=>0, "value"=>71, "id"=>8},
        {"source"=>2, "target"=>4, "value"=>30, "id"=>9},
        {"source"=>2, "target"=>0, "value"=>63, "id"=>10},
      ]
    }
    respond_to do |format|
      format.json { render :json => data.to_json }
    end
  end

end
