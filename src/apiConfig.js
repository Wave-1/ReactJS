import axios from 'axios';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoidHJhbnRyb25ndGFuIiwianRpIjoiOWI4NjdjMmItYWRlMS00ZTJjLTg3M2EtOGFlY2FlNGU5MzljIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIkFkbWluIiwiVXNlciJdLCJleHAiOjE2OTEzOTMwOTEsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjcxMzEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUyNTkifQ.i5g6GSr7KLZeohTXmX-lyl-_P93lPos1gN-sjxC-bWs';
axios.defaults.baseURL = 'https://localhost:7131/api/';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
