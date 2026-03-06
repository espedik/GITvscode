class Usuario:
    def __init__(self,nombre,cedula):
        self.nombre = nombre
        self.cedula = cedula
    
class Estudiante(Usuario):
    def __init__(self,nombre, cedula, carrera):
        super().__init__(nombre,cedula)
        self.carrera = carrera
        self.carrera = carrera
        self.limite_libros = 3


class Profesor(Usuario):
    def __init__(self, nombre, cedula):
        super().__init__(nombre, cedula)
        self.limite_libros = None