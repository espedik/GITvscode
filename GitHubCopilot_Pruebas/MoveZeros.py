def move_zeroes(nums):
    # Pointer for the next position of a non-zero element
    # Puntero para la siguiente posición de un elemento que no sea cero
    last_non_zero_index = 0
    
    for i in range(len(nums)):
        # If the current element is not zero...
        # Si el elemento actual no es cero...
        if nums[i] != 0:
            # Swap using Python's one-line syntax
            # Intercambio usando la sintaxis de una línea de Python
            nums[last_non_zero_index], nums[i] = nums[i], nums[last_non_zero_index]
            
            # Increment the pointer
            # Incrementamos el puntero
            last_non_zero_index += 1

# Input given
test_list = [0, 1, 0, 3, 12]

# Running the function
move_zeroes(test_list)

# Result
print(f"Result: {test_list}")