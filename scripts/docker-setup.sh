#!/bin/bash

# Docker Setup Script for Playwright Project
# This script helps set up and run the Playwright project in Docker

set -e

echo "🎭 Playwright Docker Setup"
echo "=========================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose and try again."
    exit 1
fi

echo "✅ Docker and Docker Compose are available"

# Function to run tests
run_tests() {
    local mode=$1
    echo "🚀 Running tests in $mode mode..."
    
    if [ "$mode" = "headed" ]; then
        docker-compose -f docker-compose.yml -f docker-compose.headed.yml up --build --abort-on-container-exit
    else
        docker-compose up --build --abort-on-container-exit
    fi
}

# Function to run specific test
run_specific_test() {
    local test_file=$1
    echo "🧪 Running specific test: $test_file"
    docker-compose run --rm playwright npx playwright test "$test_file"
}

# Function to show reports
show_reports() {
    echo "📊 Reports available at:"
    echo "   - Ortoni Report: http://localhost:2004"
    echo "   - Allure Report: http://localhost:55125"
    echo ""
    echo "To view reports, run:"
    echo "   open http://localhost:2004"
    echo "   open http://localhost:55125"
}

# Function to clean up
cleanup() {
    echo "🧹 Cleaning up Docker containers and images..."
    docker-compose down --rmi all --volumes --remove-orphans
    docker system prune -f
    echo "✅ Cleanup completed"
}

# Main menu
case "${1:-}" in
    "headed")
        run_tests "headed"
        ;;
    "specific")
        if [ -z "$2" ]; then
            echo "❌ Please provide a test file path"
            echo "Usage: $0 specific <test-file>"
            exit 1
        fi
        run_specific_test "$2"
        ;;
    "reports")
        show_reports
        ;;
    "cleanup")
        cleanup
        ;;
    "help"|"-h"|"--help")
        echo "Usage: $0 [option]"
        echo ""
        echo "Options:"
        echo "  headed     Run tests in headed mode (visible browser)"
        echo "  specific   Run a specific test file"
        echo "  reports    Show report URLs"
        echo "  cleanup    Clean up Docker containers and images"
        echo "  help       Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0                    # Run tests in headless mode"
        echo "  $0 headed             # Run tests in headed mode"
        echo "  $0 specific tests/e2e/example.spec.ts"
        echo "  $0 reports            # Show report URLs"
        echo "  $0 cleanup            # Clean up Docker resources"
        ;;
    *)
        run_tests "headless"
        ;;
esac 