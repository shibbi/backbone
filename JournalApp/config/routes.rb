JournalApp::Application.routes.draw do
  root to: 'root#root'

  resources(
    :posts,
    defaults: { format: :json },
    only: [:create, :index, :destroy, :show, :update]
  )
end
