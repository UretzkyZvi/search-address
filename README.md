# SearchAddress Component

The `SearchAddress` component provides a flexible and interactive search interface for addresses, utilizing the powerful Nominatim service from OpenStreetMap. This component is built with React and integrates UI components from `shadcn-ui` and icons from `lucide-react`.

## Features

- **Autocomplete Search**: Offers suggestions as you type, reducing the need for full address inputs and improving user experience.
- **Grouped Results**: Displays search results grouped by address type, making it easier to find the exact location.
- **Interactive UI**: Uses a popover to display search results that can be selected via click or touch interaction.

## Installation

### Dependencies

First, ensure that `shadcn-ui` components are added to your project. If not already installed, you can add them using the following command:

```bash
npx shadcn-ui@latest add button command popover
```

Additionally, install `lucide-react` for using icons:

```bash
npm install lucide-react
```

Or using yarn:

```bash
yarn add lucide-react
```

### Component File

Copy the component file into your project:

1. Download or copy the file `search-address.tsx` from the repository.
2. Place the file in your project directory, typically under `components/ui/`.

## Usage

1. **Import the Component**:

   Include the `SearchAddress` component in your React application by importing it:

   ```javascript
   import SearchAddress from "@/components/ui/search-address";
   ```

2. **Utilize the Component**:

   You can use the `SearchAddress` component anywhere within your React application:

   ```jsx
   function App() {
     return (
       <div className="App">
         <SearchAddress />
       </div>
     );
   }
   ```

## Component Dependencies

This component relies on the following external libraries and styles:

- `shadcn-ui` for UI components such as Button, Command, and Popover.
- `lucide-react` for icons like `Check` and `ChevronsUpDown`.

## API Configuration

The component makes requests to the `https://nominatim.openstreetmap.org/search` endpoint. Ensure that any API usage complies with the [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/), particularly regarding the custom HTTP header requirements for identification.


## Contributing

Contributions to enhance or fix issues in the `SearchAddress` component are welcome. Please follow the standard pull request process for this repository.

## License

This component is available under the MIT License. See the LICENSE file in the repository for full license text.